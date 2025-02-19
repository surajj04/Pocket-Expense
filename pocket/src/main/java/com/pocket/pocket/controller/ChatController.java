package com.pocket.pocket.controller;

import com.pocket.pocket.model.UserDetail;
import com.pocket.pocket.service.UserService;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {

    @Autowired
    private UserService userService;

    private final ChatClient chatClient;

    public ChatController(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }


    @GetMapping("/chat/{message}/{token}")
    public String chat(@PathVariable String message, @PathVariable String token) {
        UserDetail userDetail = userService.getUserDetail(token);
        message = message + " and this is the userDetail according to that give them a finance tips or answer of the questions and give me the short response and give me the response like that i can easily show on the screen and dont mention the conclusion " + userDetail;
        return chatClient
                .prompt()
                .user(message)
                .call()
                .content();
    }

}
