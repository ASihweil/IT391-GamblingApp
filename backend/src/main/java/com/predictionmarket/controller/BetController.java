package com.predictionmarket.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.predictionmarket.model.Bet;
import com.predictionmarket.service.BetService;

@RestController
@RequestMapping("/api/bets")
public class BetController {

    @Autowired
    private BetService betService;

    @PostMapping("/user/{userId}/market/{marketId}")
    public Bet createBet(@PathVariable Long userId, @PathVariable Long marketId, @RequestBody Bet bet) {
        return betService.createBet(userId, marketId, bet);
    }

    @GetMapping
    public List<Bet> getAllBets() {
        return betService.getAllBets();
    }

    @GetMapping("/user/{userId}")
    public List<Bet> getBetsByUser(@PathVariable Long userId) {
        return betService.getBetsByUser(userId);
    }

    @GetMapping("/market/{marketId}")
    public List<Bet> getBetsByMarket(@PathVariable Long marketId) {
        return betService.getBetsByMarket(marketId);
    }
}