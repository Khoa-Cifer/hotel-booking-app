package com.cifer.lakeSidehotel.controller;

import com.cifer.lakeSidehotel.dto.BookedResponse;
import com.cifer.lakeSidehotel.exception.PhotoRetrievalException;
import com.cifer.lakeSidehotel.model.BookedRoom;
import com.cifer.lakeSidehotel.model.Room;
import com.cifer.lakeSidehotel.dto.RoomResponse;
import com.cifer.lakeSidehotel.service.IBookedRoomService;
import com.cifer.lakeSidehotel.service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/rooms")
@CrossOrigin("*")
public class RoomController {
    private final IRoomService roomService;
    private final IBookedRoomService bookedRoomService;

    @PostMapping("/add/new-room")
    public ResponseEntity<RoomResponse> addNewRoom
            (@RequestParam("photo") MultipartFile photo,
             @RequestParam("roomType") String roomType,
             @RequestParam("roomPrice") BigDecimal roomPrice) throws SQLException, IOException {
        Room savedRoom = roomService.addNewRoom(photo, roomType, roomPrice);
        RoomResponse roomResponse = new RoomResponse(savedRoom.getId(), savedRoom.getRoomType(), savedRoom.getRoomPrice());
        return ResponseEntity.ok(roomResponse);
    }

    @GetMapping("/room-types")
    public List<String> getRoomTypes() {
        return roomService.getAllRoomTypes();
    }

    @GetMapping("/all-rooms")
    public ResponseEntity<List<RoomResponse>> getAllRooms() throws SQLException {
        List<Room> roomList = roomService.getAllRooms();
        List<RoomResponse> roomResponseList = new ArrayList<>();

        for (Room room : roomList) {
            byte[] photoBytes = roomService.getRoomPhotoByRoomId(room.getId());
            if (photoBytes != null && photoBytes.length > 0) {
                String base64Photo = Base64.encodeBase64String(photoBytes);
                RoomResponse roomResponse = getRoomResponse(room);
                roomResponse.setPhoto(base64Photo);
                roomResponseList.add(roomResponse);
            }
        }

        return ResponseEntity.ok(roomResponseList);
    }

    private RoomResponse getRoomResponse(Room room) throws PhotoRetrievalException {
        List<BookedRoom> bookedRoomList = getAllBookingsByRoomId(room.getId());
//        List<BookedResponse> bookedInfo = bookedRoomList.
//                stream().
//                map(bookedRoom -> new BookedResponse(
//                        bookedRoom.getBookingId(),
//                        bookedRoom.getCheckInDate(),
//                        bookedRoom.getCheckOutDate(),
//                        bookedRoom.getBookingConfirmationCode()
//                )).toList();
        byte[] photoBytes = null;
        Blob photoBlob = room.getPhoto();
        if (photoBlob != null) {
            try {
                photoBytes = photoBlob.getBytes(1, (int) photoBlob.length());
            } catch (SQLException e) {
                throw new PhotoRetrievalException("Error retrieving photo");
            }
        }

        return new RoomResponse(
                room.getId(),
                room.getRoomType(),
                room.getRoomPrice(),
                room.isBooked(),
                photoBytes
                //bookedInfo
        );
    }

    private List<BookedRoom> getAllBookingsByRoomId(Long id) {
        return bookedRoomService.getAllBookingsByRoomId(id);
    }

    @DeleteMapping("/delete/room/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
