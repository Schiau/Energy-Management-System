package com.example.demo.controller;

import com.example.demo.dto.Message;
import com.example.demo.dto.Status;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Controller
@Slf4j
public class ChatController {

    private final List<String> connectedUsers = new CopyOnWriteArrayList<>();
    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/message")
    @SendTo("/chatroom")
    public Message receiveMessage(@Payload Message message) {
        log.info("Received message: " + message);

        if (message.getStatus().equals(Status.JOIN)) {
            handleUserJoin(message.getSenderName());
        } else  if (message.getStatus().equals(Status.LEAVE)) {
            handleUserLeave(message.getSenderName());
        }

        return message;
    }

    private void handleUserJoin(String username) {
        if (!connectedUsers.contains(username) && username != null && !username.isEmpty()) {
            connectedUsers.add(username);
            broadcastConnectedUsers();
        }
    }

    private void handleUserLeave(String username) {
        if (connectedUsers.remove(username)) {
            broadcastConnectedUsers();
        }
    }

    private void broadcastConnectedUsers() {
        log.info("Broadcasting connected users: " + connectedUsers);
        messagingTemplate.convertAndSend("/chatroom/connected-users", connectedUsers);
    }
}
