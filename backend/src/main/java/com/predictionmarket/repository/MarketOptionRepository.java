package com.predictionmarket.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.predictionmarket.model.MarketOption;

public interface MarketOptionRepository extends JpaRepository<MarketOption, Long> {

    List<MarketOption> findByMarketId(Long marketId);
}