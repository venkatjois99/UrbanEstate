import './Filter.css';
import React, { useState } from 'react';

// Define the shape of the filter form state
interface FilterState {
    city: string;
    type: string;
    property: string;
    minPrice: string;
    maxPrice: string;
    bedroom: string;
}

const Filter: React.FC = () => {
    // Initialize the filter form state using TypeScript types
    const [filter, setFilter] = useState<FilterState>({
        city: '',
        type: '',
        property: '',
        minPrice: '',
        maxPrice: '',
        bedroom: '',
    });

    // Handle input change
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
    };

    // Handle form submission
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add your search logic here
        console.log('Search filter:', filter);
    };

    return (
        <div className="filter">
            <h1>
                Search results for <b>London</b>
            </h1>
            <form onSubmit={handleSearch}>
                <div className="top">
                    <div className="item">
                        <label htmlFor="city">Location</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            placeholder="City Location"
                            value={filter.city}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="bottom">
                    <div className="item">
                        <label htmlFor="type">Type</label>
                        <select
                            name="type"
                            id="type"
                            value={filter.type}
                            onChange={handleInputChange}
                        >
                            <option value="">Any</option>
                            <option value="buy">Buy</option>
                            <option value="rent">Rent</option>
                        </select>
                    </div>
                    <div className="item">
                        <label htmlFor="property">Property</label>
                        <select
                            name="property"
                            id="property"
                            value={filter.property}
                            onChange={handleInputChange}
                        >
                            <option value="">Any</option>
                            <option value="apartment">Apartment</option>
                            <option value="house">House</option>
                            <option value="pg">Paid Guest</option>
                            <option value="flatmates">Flatmates</option>
                        </select>
                    </div>
                    <div className="item">
                        <label htmlFor="minPrice">Min Price</label>
                        <input
                            type="number"
                            id="minPrice"
                            name="minPrice"
                            placeholder="Any"
                            value={filter.minPrice}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="maxPrice">Max Price</label>
                        <input
                            type="text"
                            id="maxPrice"
                            name="maxPrice"
                            placeholder="Any"
                            value={filter.maxPrice}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="bedroom">Bedrooms</label>
                        <input
                            type="text"
                            id="bedroom"
                            name="bedroom"
                            placeholder="Any"
                            value={filter.bedroom}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit">Search</button>
                </div>
            </form>
        </div>
    );
};

export default Filter;
