package com.cifer.lakeSidehotel.service;

import com.cifer.lakeSidehotel.model.BookedRoom;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookedRoomServiceImpl implements IBookedRoomService {

    @Override
    public List<BookedRoom> getAllBookingsByRoomId(Long id) {
        return null;
    }
}
