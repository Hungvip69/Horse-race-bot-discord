# Bot Đua Ngựa Discord

Bot Discord đua ngựa cá cược vui nhộn được xây dựng bằng Node.js và discord.js v14.

## Tính năng

- **Đặt cược**: Người chơi có thể đặt cược vào một con ngựa (1-5)
- **Đua ngựa**: Mô phỏng cuộc đua ngựa với hiệu ứng trực quan
- **Hệ thống tiền tệ**: Người chơi bắt đầu với 1000 coin, thắng nhận gấp đôi số cược
- **Quà hàng ngày**: Nhận 500 coin mỗi ngày
- **Bảng xếp hạng**: Xem người chơi giàu nhất

## Cài đặt

### Yêu cầu

- Node.js (v16.9.0 trở lên)
- npm hoặc yarn

### Các bước cài đặt

1. Clone repository này:

```bash
git clone https://github.com/your-username/bot-horse-race.git
cd bot-horse-race
```

2. Cài đặt các dependencies:

```bash
npm install
# hoặc
yarn install
```

3. Tạo file `.env` từ file `.env.example`:

```bash
cp .env.example .env
```

4. Cập nhật file `.env` với token và client ID của bot Discord của bạn:

```
TOKEN=your_discord_bot_token_here
CLIENT_ID=your_discord_bot_client_id_here
```

5. Khởi chạy bot:

```bash
npm start
# hoặc
node index.js
```

## Cách sử dụng

Bot sử dụng prefix `!` cho tất cả các lệnh.

### Các lệnh có sẵn

- `!bet <ngựa> <số_tiền>` - Đặt cược vào một con ngựa (1-5)
- `!race` - Bắt đầu cuộc đua ngựa
- `!balance` - Xem số tiền hiện có
- `!leaderboard` - Xem bảng xếp hạng người chơi
- `!daily` - Nhận quà tặng hằng ngày (500 coin)
- `!help` - Hiển thị hướng dẫn sử dụng

### Luật chơi

1. Mỗi người chơi bắt đầu với 1000 coin.
2. Sử dụng lệnh `!bet` để đặt cược vào một con ngựa (1-5).
3. Sử dụng lệnh `!race` để bắt đầu cuộc đua.
4. Nếu ngựa bạn đặt cược thắng, bạn sẽ nhận được gấp đôi số tiền cược.
5. Nếu ngựa bạn đặt cược thua, bạn sẽ mất số tiền đã cược.
6. Sử dụng lệnh `!daily` để nhận 500 coin mỗi ngày.

## Cấu trúc dự án

```
bot-horse-race/
├── commands/           # Các lệnh của bot
│   ├── balance.js      # Lệnh xem số dư
│   ├── bet.js          # Lệnh đặt cược
│   ├── daily.js        # Lệnh nhận quà hàng ngày
│   ├── help.js         # Lệnh hiển thị hướng dẫn
│   ├── leaderboard.js  # Lệnh xem bảng xếp hạng
│   └── race.js         # Lệnh bắt đầu đua ngựa
├── data/               # Dữ liệu của bot
│   └── players.json    # Dữ liệu người chơi
├── utils/              # Các tiện ích
│   ├── betManager.js   # Quản lý cược
│   ├── playerManager.js # Quản lý người chơi
│   └── raceManager.js  # Quản lý đua ngựa
├── .env                # Biến môi trường
├── .env.example        # Mẫu biến môi trường
├── .gitignore          # Các file bị bỏ qua bởi git
├── index.js            # File chính để khởi chạy bot
├── package.json        # Thông tin dự án và dependencies
└── README.md           # Hướng dẫn sử dụng
```

## Đóng góp

Mọi đóng góp đều được hoan nghênh! Hãy tạo issue hoặc pull request nếu bạn muốn cải thiện bot.

## Giấy phép

Dự án này được phân phối dưới giấy phép ISC.