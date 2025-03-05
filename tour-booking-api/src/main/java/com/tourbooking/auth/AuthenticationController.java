package com.tourbooking.auth;

import com.tourbooking.config.JwtService;
import com.tourbooking.exception.InputException;
import com.tourbooking.model.ResponseObject;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<ResponseObject> register(
            @RequestBody RegisterRequest request
    ) {
        try {
            String token = authenticationService.register(request);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Đăng ký thành công!", token)
            );
        } catch (InputException e) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("error", "Failed", null)
            );
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<ResponseObject> register(
            @RequestBody AuthenticationRequest request
    ) {
        Token token = authenticationService.authenticate(request);
        if (token != null) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Đăng nhập thành công!", token)
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("error", "Tài khoản, mật khẩu không đúng!", token)
        );
    }

    @PostMapping("/checkToken")
    public ResponseEntity<ResponseObject> checkToken(
            @RequestBody Token token
    ) {
        String tmp = jwtService.extractUsername(token.getToken());
        //System.out.println(tmp);
        if (jwtService.checkToken(token.getToken())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                    new ResponseObject("error", "Token het han", "")
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Token chua het han", token)
        );
    }
}
