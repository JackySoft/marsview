package com.marsview.controller.common;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/cloud")
public class ImgCloudController {



//  @PostMapping("/upload/files")
//  public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
//    try {
//      Map<String, Object> tokenData = util.decodeToken(request);
//      Long userId = (Long) tokenData.get("userId");
//      String userName = (String) tokenData.get("userName");
//
//      int total = imgCloudMapper.getTotalByUserId(userId);
//      String message = total > 0 && userId == 49 ? "Demo用户只能上传1个文件" :
//        total > 10 && userId != 50 ? "普通用户最多可以上传10个文件" : "";
//
//      if (message != null && !message.isEmpty()) {
//        file.delete();
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
//      }
//
//      BosClient client = new BosClient(config.getOssConfig());
//      File tempFile = new File(file.getOriginalFilename());
//      file.transferTo(tempFile);
//
//      FileInputStream fis = new FileInputStream(tempFile);
//      PutObjectResponse response = client.putObject(config.getOssBucket2(), file.getOriginalFilename(), fis, file.getContentType());
//
//      String url = config.getOssCdnDomain2() + "/" + file.getOriginalFilename();
//      imgCloudMapper.create(userId, userName, file.getOriginalFilename(), file.getOriginalFilename(), file.getContentType(), file.getSize(), url);
//
//      tempFile.delete();
//      return ResponseEntity.ok().build();
//    } catch (Exception e) {
//      file.delete();
//      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
//    }
//  }
//
//  @GetMapping("/list")
//  public ResponseEntity<Map<String, Object>> getFileList(HttpServletRequest request) {
//    Map<String, Object> tokenData = util.decodeToken(request);
//    Long userId = (Long) tokenData.get("userId");
//
//    int pageNum = Integer.parseInt(request.getParameter("pageNum"));
//    int pageSize = Integer.parseInt(request.getParameter("pageSize"));
//
//    Map<String, Object> result = imgCloudMapper.getFileList(userId, pageNum, pageSize);
//    return ResponseEntity.ok(result);
//  }
//
//  @PostMapping("/delete")
//  public ResponseEntity<Void> deleteFile(@RequestBody Map<String, Long> requestBody, HttpServletRequest request) {
//    Map<String, Object> tokenData = util.decodeToken(request);
//    Long userId = (Long) tokenData.get("userId");
//    Long id = requestBody.get("id");
//
//    if (id == null) {
//      return ResponseEntity.badRequest().build();
//    }
//
//    imgCloudMapper.deleteFile(id, userId);
//    return ResponseEntity.ok().build();
//  }
}
