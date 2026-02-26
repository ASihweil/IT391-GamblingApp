package com.predictionmarket.repository;

import com.predictionmarket.model.Market;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface MarketRepository extends JpaRepository<Market, Long> {
}