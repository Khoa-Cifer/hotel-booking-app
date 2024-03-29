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

const getRoomById = (id) => {
    return axios.get(`/rooms/room/${id}`)
}

const updateRoom = (id, roomData) => {
    const formData = new FormData();
    formData.append("photo", roomData.photo);
    formData.append("roomType", roomData.roomType);
    formData.append("roomPrice", roomData.roomPrice);
    return axios.put(`/rooms/update/${id}`, formData)
}

const deleteRoom = (id: unknown) => {
    return axios.delete(`/rooms/delete/room/${id}`);
}

export { addRoom, getRoomTypes, getAllRooms, deleteRoom, updateRoom, getRoomById }