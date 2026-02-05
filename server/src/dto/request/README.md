# LƯU Ý VỀ REQUEST DTO

1. Những request gửi lên từ client phải đặt tên theo quy tắc ActionNameRequestDto.
2. Validate đầy đủ các field cần thiết bằng thư viện 'class-transformer'.
3. Tất cả phải export dù dùng trong file hay dùng cho các service.
4. Mỗi module nếu có request thì phải có và chỉ có 1 file dto cho request đặt tên theo quy tắc modulename.request.dto.ts.
