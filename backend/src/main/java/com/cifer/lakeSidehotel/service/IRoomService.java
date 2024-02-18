package com.cifer.lakeSidehotel.service;

import com.cifer.lakeSidehotel.model.Room;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

public interface IRoomService {
    public Room addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice) throws IOException, SQLException;

    List<String> getAllRoomTypes();

    byte[] getRoomPhotoByRoomId(Long id) throws SQLException;

    List<Room> getAllRooms();

    void deleteRoom(Long id);
}
