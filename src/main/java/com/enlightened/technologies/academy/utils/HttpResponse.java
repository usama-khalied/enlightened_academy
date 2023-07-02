package com.enlightened.technologies.academy.utils;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import java.util.Date;
import lombok.Data;
import org.springframework.http.HttpStatus;

/**
 *
 * @author hasan
 */
@Data
@JsonInclude(Include.NON_NULL)
public class HttpResponse {

    public HttpResponse(String requestUri) {
        this.timestamp = DateTimeUtil.currentTimestamp();
        this.path = requestUri;
    }

    private Date timestamp;
    private int status;
    private String error;
    private String message;
    private Object data;
    private String path;

    /**
     * *
     * Sets success and message as reason phrase of provided status.
     *
     * @param status
     */
    public void setStatus(HttpStatus status) {
        this.status = status.value();
        this.message = status.getReasonPhrase();
    }
}
