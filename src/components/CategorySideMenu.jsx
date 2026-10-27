import React, { useEffect, useState } from 'react';
import { ListGroup, ListGroupItem, Spinner } from 'reactstrap';
import { loadAllCategories } from '../services/catergory-service'; // Note: matches your filename spelling
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import { FaFolderOpen, FaThLarge } from 'react-icons/fa';

export default function CategorySideMenu() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoryId } = useParams(); // Highlights the active category if viewing one

    useEffect(() => {
        loadAllCategories()
            .then((data) => {
                setCategories(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                // toast.error("Error in loading categories");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="text-center py-4 bg-white rounded-4 shadow-sm p-3">
                <Spinner size="sm" color="dark" />
                <span className="ms-2 text-muted small">Loading categories...</span>
            </div>
        );
    }

    return (
        <center>

        
        <div className="bg-white p-3 rounded-4 shadow-sm border-0 mb-4">
            {/* Header */}
            <div className="d-flex align-items-center gap-2 mb-3 px-2">
                <FaFolderOpen className="text-dark" />
                <h5 className="fw-bold mb-0 text-dark">Categories</h5>
            </div>

            <ListGroup flush className="gap-2">
                {/* Option to show all blogs */}
                <ListGroupItem 
                    tag={Link} 
                    to="/" 
                    action 
                    className={`border-0 rounded-3 text-decoration-none fw-semibold d-flex align-items-center gap-2 py-2 px-3 transition-all ${!categoryId ? 'bg-dark text-white shadow-sm' : 'bg-light text-dark'}`}
                >
                    <FaThLarge size={13} /> All Blogs
                </ListGroupItem>

                {/* Dynamically mapped categories */}
                {categories && categories.map((cat) => {
                    const isActive = categoryId === String(cat.categoryId);
                    return (
                        <ListGroupItem 
                            tag={Link} 
                            to={`/categories/${cat.categoryId}`} 
                            key={cat.categoryId} 
                            action 
                            className={`border-0 rounded-3 text-decoration-none d-flex align-items-center justify-content-between py-2 px-3 transition-all ${isActive ? 'bg-dark text-white shadow-sm' : 'bg-light text-secondary'}`}
                        >
                            <span className="fw-medium">{cat.categoryTitle}</span>
                        </ListGroupItem>
                    );
                })}
            </ListGroup>
        </div>
        </center>
    );
}