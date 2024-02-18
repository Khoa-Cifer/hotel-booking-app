package com.cifer.lakeSidehotel.service;

import com.cifer.lakeSidehotel.model.BookedRoom;

import java.util.List;

public interface IBookedRoomService {
    List<BookedRoom> getAllBookingsByRoomId(Long id);
}
