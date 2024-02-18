package com.cifer.lakeSidehotel.repository;

import com.cifer.lakeSidehotel.model.BookedRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookedRoomRepository extends JpaRepository<BookedRoom, Long> {
}
