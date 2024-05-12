import { useState, useEffect } from "react";
import get from "../../utils/conexionAPI.js";

const Filter = () => {
    const [categories, setCategories] = useState([]);
    const [areas, setAreas] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [advancedSearch, setAdvancedSearch] = useState("");

    useEffect(() => {
        get("/list.php?c=list").then((data) => {
            setCategories(data.meals);
        });

        get("/list.php?a=list").then((data) => {
            setAreas(data.meals);
        });

        get("/filter.php?i=").then((data) => {
            setIngredients(data.meals);
        });
    }, []);

    const [filteredCategories, setFilteredCategories] = useState([]);
    const [filteredAreas, setFilteredAreas] = useState([]);
    const [filteredIngredients, setFilteredIngredients] = useState([]);

    useEffect(() => {
        const filteredCategories = categories.filter((category) => {
            const includesSearch = category.strCategory
                .toLowerCase()
                .includes(advancedSearch.toLowerCase());
            if (!includesSearch) {
                const areaMatch = areas.some((area) =>
                    area.strArea
                        .toLowerCase()
                        .includes(advancedSearch.toLowerCase())
                );
                const ingredientMatch = ingredients.some((ingredient) =>
                    ingredient.strMeal
                        .toLowerCase()
                        .includes(advancedSearch.toLowerCase())
                );
                return areaMatch || ingredientMatch;
            }
            return true;
        });

        const filteredAreas = areas.filter(
            (area) =>
                area.strArea
                    .toLowerCase()
                    .includes(advancedSearch.toLowerCase()) ||
                filteredCategories.some(
                    (category) => category.strArea === area.strArea
                )
        );

        const filteredIngredients = ingredients.filter(
            (ingredient) =>
                ingredient.strMeal
                    .toLowerCase()
                    .includes(advancedSearch.toLowerCase()) ||
                filteredCategories.some(
                    (category) => category.strMeal === ingredient.strMeal
                )
        );

        setFilteredCategories(filteredCategories);
        setFilteredAreas(filteredAreas);
        setFilteredIngredients(filteredIngredients);
    }, [categories, areas, ingredients, advancedSearch]);

    return (
        <>
            <h1>Filters</h1>
            <form className="filterForm">
                <fieldset>
                    <label htmlFor="advanced-search">Advanced Search</label>
                    <input
                        name="buscar"
                        type="text"
                        placeholder="Search by Category, Area or Ingredient"
                        value={advancedSearch}
                        onChange={(e) => setAdvancedSearch(e.target.value)}
                        className="searchInput"
                    />
                </fieldset>

                <fieldset>
                    <label htmlFor="categories">Category</label>
                    <select
                        name="categories"
                        multiple
                        placeholder="Search Category"
                        id="categories"
                        tabIndex="-1"
                        className="categorySelect"
                        onChange={(e) => {
                            const selectedCategories = Array.from(
                                e.target.selectedOptions,
                                (option) => option.value
                            );
                            setFilteredCategories(
                                filteredCategories.filter((category) =>
                                    selectedCategories.includes(
                                        category.strCategory
                                    )
                                )
                            );
                        }}
                    >
                        {filteredCategories.map((category) => (
                            <option
                                key={category.strCategory}
                                value={category.strCategory}
                            >
                                {category.strCategory}
                            </option>
                        ))}
                    </select>
                </fieldset>

                <fieldset>
                    <label htmlFor="area">Area</label>
                    <select
                        name="area"
                        multiple
                        placeholder="Search Area"
                        id="area"
                        tabIndex="-1"
                        className="areaSelect"
                        onChange={(e) => {
                            const selectedAreas = Array.from(
                                e.target.selectedOptions,
                                (option) => option.value
                            );
                            setFilteredAreas(
                                areas.filter((area) =>
                                    selectedAreas.includes(area.strArea)
                                )
                            );
                        }}
                    >
                        {filteredAreas.map((area) => (
                            <option key={area.strArea} value={area.strArea}>
                                {area.strArea}
                            </option>
                        ))}
                    </select>
                </fieldset>

                <fieldset>
                    <label htmlFor="ingredient">Ingredient</label>
                    <select
                        name="ingredient"
                        multiple
                        placeholder="Search Ingredient"
                        id="ingredient"
                        tabIndex="-1"
                        className="ingredientSelect"
                        onChange={(e) => {
                            const selectedIngredients = Array.from(
                                e.target.selectedOptions,
                                (option) => option.value
                            );
                            setFilteredIngredients(
                                ingredients.filter((ingredient) =>
                                    selectedIngredients.includes(
                                        ingredient.strMeal
                                    )
                                )
                            );
                        }}
                    >
                        {filteredIngredients.map((ingredient) => (
                            <option
                                key={ingredient.strMeal}
                                value={ingredient.strMeal}
                            >
                                {ingredient.strMeal}
                            </option>
                        ))}
                    </select>
                </fieldset>

                <button className="clearButton">Clear</button>
                <button className="applyButton">Apply</button>
            </form>
        </>
    );
};

export default Filter;