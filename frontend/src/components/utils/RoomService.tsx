import axios from "./CustomizeApiFunction";

//Add room to database
const addRoom = (photo, roomType, roomPrice) => {
    const formData = new FormData()
    formData.append("photo", photo);
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);
    return axios.post("/rooms/add/new-room", formData);
}

//Get all room types from the database
const getRoomTypes = () => {
    return axios.get("/rooms/room-types");
}

//Get all rooms from the database
const getAllRooms = () => {
    return axios.get("/rooms/all-rooms");
}

const updateRoom = (roomId, roomData) => {
    
}

const deleteRoom = (id: unknown) => {
    return axios.delete(`/rooms/delete/room/${id}`);
}

export { addRoom, getRoomTypes, getAllRooms, deleteRoom }