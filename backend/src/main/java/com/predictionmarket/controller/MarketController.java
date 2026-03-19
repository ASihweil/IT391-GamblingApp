package com.predictionmarket.controller;

import com.predictionmarket.model.Market;
import com.predictionmarket.model.Bet;
import com.predictionmarket.model.User;
import com.predictionmarket.service.MarketService;
import com.predictionmarket.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/markets")
public class MarketController {

    @Autowired
    private MarketService marketService;

    @Autowired
    private UserService userService;

    private void requireAdmin(Long requesterId) {
        User requester = userService.getUserById(requesterId);
        if (!requester.getRole().equals("ADMIN")) {
            throw new IllegalStateException("Admin access required");
        }
    }

    @PostMapping
    public Market create(@RequestBody Market market, @RequestParam Long requesterId) {
        requireAdmin(requesterId);
        return marketService.createMarket(market);
    }

    @GetMapping
    public List<Market> all() {
        return marketService.getAllMarkets();
    }

    @GetMapping("/{id}")
    public Market one(@PathVariable Long id) {
        return marketService.getMarketById(id);
    }

    @PostMapping("/{id}/close")
    public Market close(@PathVariable Long id, @RequestParam Long requesterId) {
        requireAdmin(requesterId);
        return marketService.closeMarket(id);
    }

    @PostMapping("/{id}/resolve")
    public void resolve(@PathVariable Long id,
                        @RequestParam Bet.BetSide winningSide,
                        @RequestParam Long requesterId) {
        requireAdmin(requesterId);
        marketService.resolveMarket(id, winningSide);
    }
}