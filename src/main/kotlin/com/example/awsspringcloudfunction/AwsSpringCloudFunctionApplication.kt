package com.example.awsspringcloudfunction

import org.slf4j.LoggerFactory
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import java.util.function.Function

@SpringBootApplication
class AwsSpringCloudFunctionApplication {

    private val logger = LoggerFactory.getLogger(javaClass)

    @Bean
    fun hello(): Function<String, String> = Function { input ->
        logger.info("Received input: $input")
        "Hello, $input"
    }
}

fun main(args: Array<String>) {
    runApplication<AwsSpringCloudFunctionApplication>(*args)
}
