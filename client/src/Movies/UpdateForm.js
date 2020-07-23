import React, { useState, useEffect } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import uuid from 'react-uuid'


const initialMovie = {
    id: uuid(),
    title: '',
    director: '',
    metascore: '',
    stars: [],
};

const UpdateForm = props => {
    const location = useLocation();
    const params = useParams();
    const { push } = useHistory();
    const [movie, setMovie] = useState(initialMovie);

    useEffect(() => {
        if (location.state) {
            setMovie(location.state);
        } else {
            axios
                .get(`http://localhost:5000/moviesById/${params.id}`)
                .then(res => setMovie(res.data))
                .catch(err => console.log(err));
        }
    }, []);

    const changeHandler = evt => {
        evt.persist();
        let value = evt.target.value;
        if (evt.target.name === 'metascore') {
            value = parseInt(value, 10)
        }

        setMovie({
            ...movie,
            [evt.target.name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                props.setMovie(res.data);
                push(`/movies/${movie.id}`);
            })
            .catch(err => console.log(err))
    }


    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                name="title"
                onChange={changeHandler}
                placeholder="title"
                value={movie.title}
                />
                <div className="baseline" />

                <input
                type="string"
                name="director"
                onChange={changeHandler}
                placeholder="director"
                value={movie.director}
                />
                <div className="baseline" />

                <input
                type="number"
                name="metascore"
                onChange={changeHandler}
                placeholder="metascore"
                value={movie.metascore}
                />
                <div className="baseline" />

                <input
                type="array"
                name="starts"
                onChange={changeHandler}
                placeholder="starts"
                value={movie.stars}
                />
                <div className="baseline" />

                <button className="md-button form-button">Update</button>
            </form>
        </div>
    )

}

export default UpdateForm;