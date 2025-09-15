const { EmbedBuilder } = require('discord.js');
const raceManager = require('../utils/raceManager');
const betManager = require('../utils/betManager');

module.exports = {
  name: 'race',
  description: 'Bắt đầu cuộc đua ngựa',
  async execute(message, args, client) {
    // Kiểm tra xem cuộc đua có đang diễn ra không
    if (raceManager.isRaceInProgress()) {
      return message.reply('Cuộc đua đang diễn ra. Vui lòng đợi kết thúc!');
    }
    
    // Kiểm tra xem có người đặt cược không
    const bets = betManager.getAllBets();
    if (bets.size === 0) {
      return message.reply('Chưa có ai đặt cược. Sử dụng lệnh !bet để đặt cược trước khi bắt đầu đua!');
    }
    
    // Đặt trạng thái đua là đang diễn ra
    raceManager.setRaceStatus(true);
    
    // Thông báo bắt đầu cuộc đua
    const startEmbed = new EmbedBuilder()
      .setTitle('🏇 Cuộc đua bắt đầu!')
      .setColor('#0099ff')
      .setDescription('Các con ngựa đã sẵn sàng tại vạch xuất phát!')
      .setTimestamp()
      .setFooter({ text: 'Cuộc đua sẽ diễn ra trong vài giây...' });
    
    const raceMessage = await message.channel.send({ embeds: [startEmbed] });
    
    // Thiết lập thông số cuộc đua
    const trackLength = 10; // Độ dài đường đua
    const positions = Array(raceManager.HORSE_COUNT).fill(0); // Vị trí ban đầu của các con ngựa
    let raceFinished = false;
    
    // Mô phỏng cuộc đua
    while (!raceFinished) {
      // Mô phỏng một bước đua
      const newPositions = raceManager.simulateRaceStep(positions, trackLength);
      for (let i = 0; i < positions.length; i++) {
        positions[i] = newPositions[i];
      }
      
      // Tạo tin nhắn trạng thái đua
      const statusMessage = raceManager.createRaceStatusMessage(positions, trackLength);
      
      // Cập nhật tin nhắn
      await raceMessage.edit({ content: statusMessage, embeds: [] });
      
      // Thông báo ngựa dẫn đầu
      const leadingMessage = raceManager.createLeadingHorseMessage(positions);
      await message.channel.send(leadingMessage);
      
      // Kiểm tra xem cuộc đua đã kết thúc chưa
      raceFinished = raceManager.isRaceFinished(positions, trackLength);
      
      // Đợi một chút trước khi cập nhật tiếp
      if (!raceFinished) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Đợi 2 giây
      }
    }
    
    // Xác định ngựa thắng cuộc
    const winners = raceManager.getWinners(positions);
    
    // Xử lý kết quả cược
    const betResults = betManager.processBetResults(winners);
    
    // Tạo thông báo kết quả
    const winnerText = winners.length === 1 
      ? `🎉 Ngựa số ${winners[0]} thắng!` 
      : `🎉 Ngựa số ${winners.join(' và ')} cùng về đích!`;
    
    const resultEmbed = new EmbedBuilder()
      .setTitle('🏁 Kết quả cuộc đua')
      .setColor('#FFD700')
      .setDescription(winnerText)
      .setTimestamp();
    
    // Thêm thông tin người thắng cược
    let winnerCount = 0;
    betResults.forEach(result => {
      if (result.won) {
        winnerCount++;
        resultEmbed.addFields({
          name: `Người chơi ${winnerCount}`,
          value: `<@${result.userId}> thắng ${result.winAmount} coin!`,
          inline: true
        });
      }
    });
    
    if (winnerCount === 0) {
      resultEmbed.addFields({
        name: 'Không có người thắng cược',
        value: 'Tất cả người chơi đều thua cược trong lần này.',
        inline: false
      });
    }
    
    // Gửi thông báo kết quả
    await message.channel.send({ embeds: [resultEmbed] });
    
    // Xóa tất cả thông tin cược và đặt trạng thái đua là kết thúc
    betManager.clearAllBets();
    raceManager.setRaceStatus(false);
  },
};