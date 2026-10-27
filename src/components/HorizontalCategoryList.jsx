import React, { useEffect, useState } from 'react';
import { Nav, NavItem, NavLink, Spinner } from 'reactstrap';
import { toast } from 'react-toastify';
import { loadAllCategories } from '../services/catergory-service';
import { Link, useParams } from 'react-router-dom';

export default function HorizontalCategoryList() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { categoryId } = useParams(); // Optional: used to highlight the active category

    useEffect(() => {
        loadAllCategories()
            .then((data) => {
                setCategories(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                toast.error("Error in loading categories");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="text-center py-2 mb-3">
                <Spinner size="sm" color="dark" />
            </div>
        );
    }

    return (
        <div className="py-2 mb-4 border-bottom">
            {/* Horizontal scrollable container */}
            <Nav className="flex-nowrap overflow-auto pb-2 gap-2 scrollbar-none" style={{ whiteSpace: 'nowrap' }}>
                {/* All Blogs Pill */}
                <NavItem>
                    <NavLink 
                        tag={Link} 
                        to="/" 
                        className={`rounded-pill px-4 py-2 fw-semibold text-decoration-none transition-all ${!categoryId ? 'bg-dark text-white shadow-sm' : 'bg-light text-dark hover-bg-secondary'}`}
                    >
                        All Blogs
                    </NavLink>
                </NavItem>

                {/* Dynamically Mapped Categories */}
                {categories.map((cat) => {
                    const isActive = categoryId === String(cat.categoryId);
                    return (
                        <NavItem key={cat.categoryId}>
                            <NavLink 
                                tag={Link} 
                                to={`/categories/${cat.categoryId}`}
                                className={`rounded-pill px-4 py-2 fw-semibold text-decoration-none transition-all ${isActive ? 'bg-dark text-white shadow-sm' : 'bg-light text-secondary'}`}
                            >
                                {cat.categoryTitle}
                            </NavLink>
                        </NavItem>
                    );
                })}
            </Nav>
        </div>
    );
}