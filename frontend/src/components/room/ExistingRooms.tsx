import { SetStateAction, useEffect, useState } from "react"
import { deleteRoom, getAllRooms } from "../utils/RoomService";
import { Col } from "react-bootstrap";
import RoomFilter from "../common/existingroom/RoomFilter";
import RoomPagination from "../common/existingroom/RoomPagination";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ExistingRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(8);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredRooms, setFilteredRooms] = useState([])
    const [selectedRoomType, setSelectedRoomType] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const fetchRooms = async () => {
        setIsLoading(true);
        try {
            const result = await getAllRooms();
            setRooms(result);
            setIsLoading(false);
        } catch (error) {
            setErrorMessage("Can not get room from database");
        }
    }

    useEffect(() => {
        fetchRooms();
    }, [])

    useEffect(() => {
        if (selectedRoomType == "") {
            setFilteredRooms(rooms);
        } else {
            const filtered = rooms.filter((room) => room.roomType === selectedRoomType);
            setFilteredRooms(filtered);
        }
        setCurrentPage(1);
    }, [rooms, selectedRoomType])

    const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
        return Math.ceil(totalRooms / roomsPerPage);
    }

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

    //Delete feature
    const handleDelete = async (id) => {
        try {
            const result = await deleteRoom(id);
            if (result) {
                setSuccessMessage(`Room No ${id} was deleted`)
                fetchRooms();
            } else {
                setErrorMessage(`Error deleting room: ${result.data}`);
            }
        } catch (error) {
            error.data;
        }
        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000)
    }
    return (
        <div>
            {isLoading ? (
                <p>Loading existing rooms</p>
            ) : (
                <div>
                    <section className="my-5 container">
                        <div className="flex justify-center mb-3 mt-5">
                            <h2>Existing rooms</h2>
                        </div>
                        {successMessage && (
							<div className="alert alert-success fade show"> {successMessage}</div>
						)}
                        <Col md={6} className="mb-3 mb-md-0">
                            <RoomFilter data={rooms} setFilteredData={setFilteredRooms}>

                            </RoomFilter>
                        </Col>

                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr className="text-center">
                                    <th>ID</th>
                                    <th>Room Type</th>
                                    <th>Room Price</th>
                                    <th className="w-1/4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRooms && currentRooms.map && currentRooms.map((room) => (
                                    <tr key={room.id} className="text-center">
                                        <td>{room.id}</td>
                                        <td>{room.roomType}</td>
                                        <td>{room.roomPrice}</td>
                                        <td>
                                            <Link to={`/edit-room/${room.id}`}>
                                                <span className="btn btn-info mr-3 btn-sm"><FaEye /></span>
                                                <span className="btn btn-warning mr-3 btn-sm"><FaEdit /></span>
                                            </Link>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(room.id)}
                                            >
                                                <FaTrashAlt className="m-auto"/>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <RoomPagination
                            currentPage={currentPage}
                            totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
                            onPageChange={(pageNumber: SetStateAction<number>) => {
                                setCurrentPage(pageNumber);
                            }}>
                        </RoomPagination>
                    </section>
                </div>
            )}
        </div>
    )
}

export default ExistingRooms