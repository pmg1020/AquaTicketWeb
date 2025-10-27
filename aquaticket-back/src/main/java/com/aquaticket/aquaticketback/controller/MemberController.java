package com.aquaticket.aquaticketback.controller;

import com.aquaticket.aquaticketback.dto.UpdateMeRequest;
import com.aquaticket.aquaticketback.dto.ChangePasswordRequest;
import com.aquaticket.aquaticketback.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMyInfo() {
        return ResponseEntity.ok(memberService.getMyInfo());
    }

    @PatchMapping("/me")
    public ResponseEntity<?> updateMyInfo(@RequestBody UpdateMeRequest request) {
        memberService.updateMyInfo(request);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request) {
        memberService.changePassword(request);
        return ResponseEntity.ok().build();
    }
}
