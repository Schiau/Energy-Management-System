package com.example.users.services;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@AllArgsConstructor
public class AddUserToDevicesService {
    private final String URL_DEVICES = "http://microservice2:8081/users/";

    private final RestTemplate restTemplate;

    public boolean addUserToDevices(String userId, String token) {
        String url = URL_DEVICES + userId;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        HttpEntity<Void> entity = new HttpEntity<>(headers);
        ResponseEntity<Void> response = restTemplate.exchange(url, HttpMethod.POST, entity, Void.class);
        return response.getStatusCode().is2xxSuccessful();
    }

    public boolean removeUserToDevices(Integer userId, String token) {
        String url = URL_DEVICES + userId.toString();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        HttpEntity<Void> entity = new HttpEntity<>(headers);
        ResponseEntity<Void> response = restTemplate.exchange(url, HttpMethod.DELETE, entity, Void.class);
        return response.getStatusCode().is2xxSuccessful();
    }
}
