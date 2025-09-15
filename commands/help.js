const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Hiển thị hướng dẫn sử dụng bot',
  execute(message, args, client) {
    // Tạo embed thông báo
    const embed = new EmbedBuilder()
      .setTitle('🏇 Bot Đua Ngựa - Hướng Dẫn')
      .setColor('#0099ff')
      .setDescription('Bot đua ngựa cá cược vui nhộn!')
      .addFields(
        { name: '!bet <ngựa> <số_tiền>', value: 'Đặt cược vào một con ngựa (1-5)', inline: false },
        { name: '!race', value: 'Bắt đầu cuộc đua ngựa', inline: false },
        { name: '!balance', value: 'Xem số tiền hiện có', inline: false },
        { name: '!leaderboard', value: 'Xem bảng xếp hạng người chơi', inline: false },
        { name: '!daily', value: 'Nhận quà tặng hằng ngày (500 coin)', inline: false },
        { name: '!help', value: 'Hiển thị hướng dẫn này', inline: false }
      )
      .addFields(
        { name: 'Luật chơi', value: 'Mỗi người chơi bắt đầu với 1000 coin. Đặt cược vào một con ngựa, nếu thắng sẽ nhận gấp đôi số tiền cược, nếu thua sẽ mất số tiền đã cược.', inline: false }
      )
      .setTimestamp()
      .setFooter({ text: 'Chúc bạn may mắn!' });
    
    return message.reply({ embeds: [embed] });
  },
};