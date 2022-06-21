// import { HttpException, HttpStatus } from '@nestjs/common';
// import { existsSync, mkdirSync } from 'fs';
// import { diskStorage, memoryStorage } from 'multer';
// import { extname } from 'path';

// export const multerDiskOptions = {
//   /**
//    * @description 클라이언트로 부터 전송 받은 파일 정보를 필터링 한다
//    *
//    * @param request Request 객체
//    * @param file 파일 정보
//    * @param callback 성공 및 실패 콜백함수
//    */
//   fileFilter: (request: Request, file: Express.Multer.File, callback: Function) => {
//     if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
//       // 이미지 형식은 jpg, jpeg, png만 허용합니다.
//       callback(null, true);
//     } else {
//       callback(
//         new HttpException(
//           {
//             message: 1,
//             error: '지원하지 않는 이미지 형식입니다.',
//           },
//           HttpStatus.BAD_REQUEST,
//         ),
//         false,
//       );
//     }
//   },
//   storage: diskStorage({
//     destination: (request, file, callback: Function) => {
//       const uploadPath = 'uploads';
//       if (!existsSync(uploadPath)) {
//         mkdirSync(uploadPath);
//       }
//       callback(null, uploadPath);
//     },
//     filename: (request, file, callback) => {
//       callback(null, `${Date.now()}${extname(file.originalname)}`);
//     },
//   }),
//   limits: {
//     fieldNameSize: 200, // 필드명 사이즈 최대값 (기본값 100bytes)
//     filedSize: 1024 * 1024, // 필드 사이즈 값 설정 (기본값 1MB)
//     fields: 2, // 파일 형식이 아닌 필드의 최대 개수 (기본 값 무제한)
//     fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
//     files: 10, //multipart 형식 폼에서 파일 필드 최대 개수 (기본 값 무제한)
//   },
// };

// /**
//  * @description 파일 업로드 경로
//  * @param file 파일 정보
//  *
//  * @returns {String} 파일 업로드 경로
//  */
// export const uploadFileURL = (fileName): string =>
//   `http://localhost:3000/${fileName}`;