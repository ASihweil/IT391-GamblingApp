package com.predictionmarket.service;

import com.predictionmarket.model.Market;
import com.predictionmarket.repository.MarketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MarketService {

    @Autowired
    private MarketRepository marketRepository;

    public Market createMarket(Market market) {
        if (market.getStatus() == null) {
            market.setStatus(Market.MarketStatus.OPEN);
        }
        return marketRepository.save(market);
    }

    public List<Market> getAllMarkets() {
        return marketRepository.findAll();
    }

    public Optional<Market> getMarketById(Long id) {
        return marketRepository.findById(id);
    }

    public Market closeMarket(Long id) {
        Market market = marketRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Market not found"));
        market.setStatus(Market.MarketStatus.CLOSED);
        return marketRepository.save(market);
    }
}