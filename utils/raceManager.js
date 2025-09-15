/**
 * Module quản lý cuộc đua ngựa
 */

// Số lượng ngựa trong cuộc đua
const HORSE_COUNT = 5;

// Trạng thái cuộc đua
let raceInProgress = false;

// Danh sách emoji ngựa
const HORSE_EMOJI = '🏇';
const FINISH_EMOJI = '🏁';

/**
 * Kiểm tra xem cuộc đua có đang diễn ra không
 * @returns {boolean} true nếu đang diễn ra, false nếu không
 */
function isRaceInProgress() {
  return raceInProgress;
}

/**
 * Đặt trạng thái cuộc đua
 * @param {boolean} status Trạng thái mới
 */
function setRaceStatus(status) {
  raceInProgress = status;
}

/**
 * Tạo tin nhắn trạng thái đua
 * @param {Array} positions Vị trí của các con ngựa
 * @param {number} trackLength Độ dài đường đua
 * @returns {string} Tin nhắn hiển thị trạng thái đua
 */
function createRaceStatusMessage(positions, trackLength) {
  let message = '🏁 Cuộc đua đang diễn ra! 🏁\n\n';
  
  for (let i = 0; i < HORSE_COUNT; i++) {
    const position = positions[i];
    const horseNumber = i + 1;
    
    // Tạo đường đua với vị trí ngựa
    let track = '';
    for (let j = 0; j < trackLength; j++) {
      if (j === position) {
        track += HORSE_EMOJI;
      } else {
        track += '▫️';
      }
    }
    
    // Thêm số ngựa và đường đua vào tin nhắn
    message += `Ngựa ${horseNumber}: ${track} ${position === trackLength - 1 ? FINISH_EMOJI : ''}\n`;
  }
  
  return message;
}

/**
 * Tạo tin nhắn trạng thái đua với ngựa dẫn đầu
 * @param {Array} positions Vị trí của các con ngựa
 * @returns {string} Tin nhắn hiển thị ngựa dẫn đầu
 */
function createLeadingHorseMessage(positions) {
  // Tìm ngựa dẫn đầu
  let maxPosition = -1;
  let leadingHorses = [];
  
  for (let i = 0; i < positions.length; i++) {
    if (positions[i] > maxPosition) {
      maxPosition = positions[i];
      leadingHorses = [i + 1]; // Lưu số ngựa (bắt đầu từ 1)
    } else if (positions[i] === maxPosition) {
      leadingHorses.push(i + 1);
    }
  }
  
  // Tạo tin nhắn
  if (leadingHorses.length === 1) {
    return `${HORSE_EMOJI}💨 Ngựa ${leadingHorses[0]} đang dẫn đầu!`;
  } else {
    const horsesText = leadingHorses.join(' và ');
    return `${HORSE_EMOJI}💨 Ngựa ${horsesText} đang cùng dẫn đầu!`;
  }
}

/**
 * Chọn ngẫu nhiên ngựa thắng cuộc
 * @returns {number} Số ngựa thắng (1-5)
 */
function determineWinner() {
  return Math.floor(Math.random() * HORSE_COUNT) + 1;
}

/**
 * Mô phỏng một bước trong cuộc đua
 * @param {Array} positions Vị trí hiện tại của các con ngựa
 * @param {number} trackLength Độ dài đường đua
 * @returns {Array} Vị trí mới của các con ngựa
 */
function simulateRaceStep(positions, trackLength) {
  const newPositions = [...positions];
  
  // Mỗi con ngựa có cơ hội di chuyển
  for (let i = 0; i < HORSE_COUNT; i++) {
    // Chỉ di chuyển nếu chưa về đích
    if (newPositions[i] < trackLength - 1) {
      // 60% cơ hội di chuyển 1 bước, 30% cơ hội di chuyển 2 bước, 10% cơ hội đứng yên
      const moveChance = Math.random();
      
      if (moveChance < 0.6) {
        newPositions[i] += 1;
      } else if (moveChance < 0.9) {
        newPositions[i] += 2;
      }
      
      // Đảm bảo không vượt quá đường đua
      if (newPositions[i] >= trackLength - 1) {
        newPositions[i] = trackLength - 1;
      }
    }
  }
  
  return newPositions;
}

/**
 * Kiểm tra xem cuộc đua đã kết thúc chưa
 * @param {Array} positions Vị trí của các con ngựa
 * @param {number} trackLength Độ dài đường đua
 * @returns {boolean} true nếu đã kết thúc, false nếu chưa
 */
function isRaceFinished(positions, trackLength) {
  // Cuộc đua kết thúc khi có ít nhất một con ngựa về đích
  return positions.some(position => position >= trackLength - 1);
}

/**
 * Xác định ngựa thắng cuộc dựa trên vị trí
 * @param {Array} positions Vị trí của các con ngựa
 * @returns {Array} Danh sách số ngựa thắng cuộc (có thể có nhiều con cùng thắng)
 */
function getWinners(positions) {
  const maxPosition = Math.max(...positions);
  const winners = [];
  
  for (let i = 0; i < positions.length; i++) {
    if (positions[i] === maxPosition) {
      winners.push(i + 1); // Số ngựa bắt đầu từ 1
    }
  }
  
  return winners;
}

module.exports = {
  HORSE_COUNT,
  isRaceInProgress,
  setRaceStatus,
  createRaceStatusMessage,
  createLeadingHorseMessage,
  determineWinner,
  simulateRaceStep,
  isRaceFinished,
  getWinners
};