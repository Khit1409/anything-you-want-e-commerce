# LƯU Ý VỀ DTO RESPONSE

1. Những response của từng field trong api phải đặt tên theo quy tắc ClassNameResponseDto.
2. Response api interface phải extends ResponseDto và đặt tên à ResponseNameApi.
3. Tất cả phải export dù dùng trong file hay dùng cho các service.
4. Mỗi module có response phải có và chỉ có 1 file dto duy nhất, đặt tên theo quy tắc modulename.response.dto.ts.