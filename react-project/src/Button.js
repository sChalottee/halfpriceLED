import axios from "axios";

const Button = () => {
    const deleteBtn = document.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", function (event) {
        axios
            .delete("/categories")
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    });

    const addBtn = document.querySelector(".addBtn");
    addBtn.addEventListener("click", function (event) {
        axios
            .post("/categories")
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    });

    const uploadBtn = document.querySelector(".uploadBtn");
    uploadBtn.addEventListener("click", function (event) {
        axios
            .post("/categories")
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    });
};

export default Button;
