const { EmbedBuilder } = require('discord.js');
const betManager = require('../utils/betManager');

module.exports = {
  name: 'bet',
  description: 'Đặt cược vào một con ngựa',
  execute(message, args, client) {
    // Kiểm tra đủ tham số
    if (args.length < 2) {
      return message.reply('Sử dụng: !bet <ngựa> <số_tiền>');
    }
    
    // Phân tích tham số
    const horseNumber = parseInt(args[0]);
    const betAmount = parseInt(args[1]);
    
    // Kiểm tra tham số hợp lệ
    if (isNaN(horseNumber) || isNaN(betAmount)) {
      return message.reply('Số ngựa và số tiền cược phải là số.');
    }
    
    // Đặt cược
    const result = betManager.placeBet(message.author.id, horseNumber, betAmount);
    
    // Tạo embed thông báo
    const embed = new EmbedBuilder()
      .setTitle('🎲 Đặt cược')
      .setColor(result.success ? '#00FF00' : '#FF0000')
      .setDescription(result.message)
      .setTimestamp()
      .setFooter({ text: `${message.author.username}`, iconURL: message.author.displayAvatarURL() });
    
    // Thêm thông tin số dư nếu đặt cược thành công
    if (result.success) {
      embed.addFields({ name: 'Số dư hiện tại', value: `${result.balance} coin`, inline: true });
    }
    
    return message.reply({ embeds: [embed] });
  },
};