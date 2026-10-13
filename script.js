/* ==========================================
   SET OPERATION CALCULATOR
   Sandip University
========================================== */


/* =========================
   GET ELEMENTS
========================= */

const setAInput = document.getElementById("setA");
const setBInput = document.getElementById("setB");
const universalInput = document.getElementById("universal");

const operationSelect = document.getElementById("operation");

const calculateBtn = document.getElementById("calculateBtn");
const clearBtn = document.getElementById("clearBtn");

const resultTitle = document.getElementById("resultTitle");
const resultElement = document.getElementById("result");
const explanationElement = document.getElementById("explanation");
const formulaElement = document.getElementById("formula");

const statA = document.getElementById("statA");
const statB = document.getElementById("statB");
const statIntersection =
    document.getElementById("statIntersection");
const statUnion =
    document.getElementById("statUnion");

const vennAOnly =
    document.getElementById("vennAOnly");

const vennIntersection =
    document.getElementById("vennIntersection");

const vennBOnly =
    document.getElementById("vennBOnly");

const aOnlyRegion =
    document.getElementById("aOnly");

const intersectionRegion =
    document.getElementById("intersection");

const bOnlyRegion =
    document.getElementById("bOnly");


/* =========================
   PARSE SET
========================= */

function parseSet(value) {

    if (!value || !value.trim()) {
        return [];
    }

    const values = value
        .split(/[,;\n]+/)
        .map(item => item.trim())
        .filter(item => item !== "");


    const uniqueValues = [];

    values.forEach(value => {

        if (!uniqueValues.includes(value)) {
            uniqueValues.push(value);
        }

    });


    return uniqueValues;
}


/* =========================
   FORMAT SET
========================= */

function formatSet(set) {

    if (!set || set.length === 0) {
        return "∅";
    }

    return `{ ${set.join(", ")} }`;
}


/* =========================
   UNION
========================= */

function union(A, B) {

    return [
        ...new Set([
            ...A,
            ...B
        ])
    ];
}


/* =========================
   INTERSECTION
========================= */

function intersection(A, B) {

    return A.filter(
        element => B.includes(element)
    );
}


/* =========================
   DIFFERENCE
========================= */

function difference(A, B) {

    return A.filter(
        element => !B.includes(element)
    );
}


/* =========================
   SYMMETRIC DIFFERENCE
========================= */

function symmetricDifference(A, B) {

    return [
        ...difference(A, B),
        ...difference(B, A)
    ];
}


/* =========================
   COMPLEMENT
========================= */

function complement(A, U) {

    return U.filter(
        element => !A.includes(element)
    );
}


/* =========================
   SUBSET
========================= */

function isSubset(A, B) {

    return A.every(
        element => B.includes(element)
    );
}


/* =========================
   PROPER SUBSET
========================= */

function isProperSubset(A, B) {

    return (
        isSubset(A, B) &&
        A.length < B.length
    );
}


/* =========================
   EQUAL
========================= */

function areEqual(A, B) {

    return (
        A.length === B.length &&
        isSubset(A, B)
    );
}


/* =========================
   DISJOINT
========================= */

function areDisjoint(A, B) {

    return intersection(A, B).length === 0;
}


/* =========================
   POWER SET
========================= */

function powerSet(set) {

    if (set.length > 10) {

        return null;

    }

    const result = [[]];


    for (const element of set) {

        const newSubsets = result.map(
            subset => [
                ...subset,
                element
            ]
        );

        result.push(...newSubsets);

    }


    return result;
}


/* =========================
   CARTESIAN PRODUCT
========================= */

function cartesianProduct(A, B) {

    const result = [];

    A.forEach(a => {

        B.forEach(b => {

            result.push(
                `(${a}, ${b})`
            );

        });

    });

    return result;
}


/* =========================
   UPDATE STATISTICS
========================= */

function updateStatistics(A, B) {

    const common =
        intersection(A, B);

    const combined =
        union(A, B);


    statA.textContent = A.length;

    statB.textContent = B.length;

    statIntersection.textContent =
        common.length;

    statUnion.textContent =
        combined.length;
}


/* =========================
   UPDATE VENN DIAGRAM
========================= */

function updateVenn(A, B) {

    const onlyA =
        difference(A, B);

    const common =
        intersection(A, B);

    const onlyB =
        difference(B, A);


    vennAOnly.textContent =
        onlyA.length
            ? onlyA.join(", ")
            : "∅";


    vennIntersection.textContent =
        common.length
            ? common.join(", ")
            : "∅";


    vennBOnly.textContent =
        onlyB.length
            ? onlyB.join(", ")
            : "∅";


    if (aOnlyRegion) {

        aOnlyRegion.style.opacity =
            onlyA.length ? "1" : "0.18";

    }


    if (intersectionRegion) {

        intersectionRegion.style.opacity =
            common.length ? "0.8" : "0.15";

    }


    if (bOnlyRegion) {

        bOnlyRegion.style.opacity =
            onlyB.length ? "1" : "0.18";

    }

}


/* =========================
   DISPLAY RESULT
========================= */

function showResult(
    title,
    result,
    explanation,
    formula,
    symbol
) {

    resultTitle.textContent = title;

    resultElement.textContent = result;

    explanationElement.textContent =
        explanation;

    formulaElement.textContent =
        formula;


    const resultSymbol =
        document.querySelector(
            ".result-header .result-symbol"
        );


    if (resultSymbol) {

        resultSymbol.textContent =
            symbol;

    }

}


/* =========================
   CALCULATE
========================= */

function calculate() {

    const A =
        parseSet(setAInput.value);

    const B =
        parseSet(setBInput.value);

    const U =
        parseSet(universalInput.value);

    const operation =
        operationSelect.value;


    updateStatistics(A, B);

    updateVenn(A, B);


    switch (operation) {


        /* =====================
           UNION
        ===================== */

        case "union": {

            const result =
                union(A, B);


            showResult(

                "Union of A and B",

                formatSet(result),

                "The union contains every unique element that appears in either Set A or Set B.",

                "A ∪ B = {x | x ∈ A or x ∈ B}",

                "A ∪ B"

            );

            break;

        }


        /* =====================
           INTERSECTION
        ===================== */

        case "intersection": {

            const result =
                intersection(A, B);


            showResult(

                "Intersection of A and B",

                formatSet(result),

                "The intersection contains only the elements that are common to both Set A and Set B.",

                "A ∩ B = {x | x ∈ A and x ∈ B}",

                "A ∩ B"

            );

            break;

        }


        /* =====================
           A - B
        ===================== */

        case "differenceAB": {

            const result =
                difference(A, B);


            showResult(

                "Difference A − B",

                formatSet(result),

                "This operation contains elements that belong to A but do not belong to B.",

                "A − B = {x | x ∈ A and x ∉ B}",

                "A − B"

            );

            break;

        }


        /* =====================
           B - A
        ===================== */

        case "differenceBA": {

            const result =
                difference(B, A);


            showResult(

                "Difference B − A",

                formatSet(result),

                "This operation contains elements that belong to B but do not belong to A.",

                "B − A = {x | x ∈ B and x ∉ A}",

                "B − A"

            );

            break;

        }


        /* =====================
           SYMMETRIC DIFFERENCE
        ===================== */

        case "symmetric": {

            const result =
                symmetricDifference(A, B);


            showResult(

                "Symmetric Difference",

                formatSet(result),

                "The symmetric difference contains elements that belong to exactly one of the two sets.",

                "A △ B = (A − B) ∪ (B − A)",

                "A △ B"

            );

            break;

        }


        /* =====================
           COMPLEMENT A
        ===================== */

        case "complementA": {

            if (U.length === 0) {

                showResult(

                    "Complement of A",

                    "Enter a Universal Set",

                    "A universal set is required to calculate the complement of A.",

                    "A′ = U − A",

                    "A′"

                );

                break;

            }


            const result =
                complement(A, U);


            showResult(

                "Complement of A",

                formatSet(result),

                "The complement of A contains elements from the universal set that are not in A.",

                "A′ = U − A",

                "A′"

            );

            break;

        }


        /* =====================
           COMPLEMENT B
        ===================== */

        case "complementB": {

            if (U.length === 0) {

                showResult(

                    "Complement of B",

                    "Enter a Universal Set",

                    "A universal set is required to calculate the complement of B.",

                    "B′ = U − B",

                    "B′"

                );

                break;

            }


            const result =
                complement(B, U);


            showResult(

                "Complement of B",

                formatSet(result),

                "The complement of B contains elements from the universal set that are not in B.",

                "B′ = U − B",

                "B′"

            );

            break;

        }


        /* =====================
           SUBSET
        ===================== */

        case "subset": {

            const result =
                isSubset(A, B);


            showResult(

                "Subset Relationship",

                result
                    ? "TRUE — A ⊆ B"
                    : "FALSE — A ⊄ B",

                result
                    ? "Every element of A is also present in B."
                    : "At least one element of A is not present in B.",

                "A ⊆ B ⇔ ∀x (x ∈ A → x ∈ B)",

                "A ⊆ B"

            );

            break;

        }


        /* =====================
           PROPER SUBSET
        ===================== */

        case "properSubset": {

            const result =
                isProperSubset(A, B);


            showResult(

                "Proper Subset Relationship",

                result
                    ? "TRUE — A ⊂ B"
                    : "FALSE — A ⊄ B",

                result
                    ? "A is a subset of B and A has fewer elements than B."
                    : "A is not a proper subset of B.",

                "A ⊂ B ⇔ A ⊆ B and A ≠ B",

                "A ⊂ B"

            );

            break;

        }


        /* =====================
           SUPERSET
        ===================== */

        case "superset": {

            const result =
                isSubset(B, A);


            showResult(

                "Superset Relationship",

                result
                    ? "TRUE — A ⊇ B"
                    : "FALSE — A ⊉ B",

                result
                    ? "Every element of B is also present in A."
                    : "At least one element of B is not present in A.",

                "A ⊇ B ⇔ B ⊆ A",

                "A ⊇ B"

            );

            break;

        }


        /* =====================
           PROPER SUPERSET
        ===================== */

        case "properSuperset": {

            const result =
                isProperSubset(B, A);


            showResult(

                "Proper Superset Relationship",

                result
                    ? "TRUE — A ⊃ B"
                    : "FALSE — A ⊅ B",

                result
                    ? "A contains every element of B and has additional elements."
                    : "A is not a proper superset of B.",

                "A ⊃ B ⇔ B ⊂ A",

                "A ⊃ B"

            );

            break;

        }


        /* =====================
           EQUAL SETS
        ===================== */

        case "equal": {

            const result =
                areEqual(A, B);


            showResult(

                "Equality of Sets",

                result
                    ? "TRUE — A = B"
                    : "FALSE — A ≠ B",

                result
                    ? "Both sets contain exactly the same elements."
                    : "The two sets do not contain exactly the same elements.",

                "A = B ⇔ A ⊆ B and B ⊆ A",

                "A = B"

            );

            break;

        }


        /* =====================
           DISJOINT
        ===================== */

        case "disjoint": {

            const result =
                areDisjoint(A, B);


            showResult(

                "Disjoint Sets",

                result
                    ? "TRUE — A and B are disjoint"
                    : "FALSE — A and B are not disjoint",

                result
                    ? "The two sets have no common elements."
                    : "The two sets contain at least one common element.",

                "A ∩ B = ∅",

                "A ∩ B"

            );

            break;

        }


        /* =====================
           CARDINALITY
        ===================== */

        case "cardinality": {

            showResult(

                "Cardinality of Sets",

                `|A| = ${A.length} , |B| = ${B.length}`,

                "Cardinality represents the number of distinct elements contained in a set.",

                "|A| = Number of elements in A",

                "|A| , |B|"

            );

            break;

        }


        /* =====================
           POWER SET
        ===================== */

        case "powerSet": {

            const P =
                powerSet(A);


            if (!P) {

                showResult(

                    "Power Set",

                    "Set A is too large",

                    "For performance reasons, the calculator supports power sets for sets containing up to 10 elements.",

                    "|P(A)| = 2ⁿ",

                    "P(A)"

                );

                break;

            }


            const formatted =
                P.map(
                    subset => formatSet(subset)
                ).join(", ");


            showResult(

                "Power Set of A",

                `{ ${formatted} }`,

                `The power set contains all possible subsets of A. Since A has ${A.length} elements, its power set contains ${P.length} subsets.`,

                "|P(A)| = 2ⁿ",

                "P(A)"

            );

            break;

        }


        /* =====================
           CARTESIAN PRODUCT
        ===================== */

        case "cartesian": {

            const result =
                cartesianProduct(A, B);


            showResult(

                "Cartesian Product A × B",

                result.length
                    ? `{ ${result.join(", ")} }`
                    : "∅",

                "The Cartesian product contains ordered pairs where the first element comes from A and the second element comes from B.",

                "A × B = {(a,b) | a ∈ A and b ∈ B}",

                "A × B"

            );

            break;

        }

    }

}


/* =========================
   CLEAR
========================= */

function clearCalculator() {

    setAInput.value = "";

    setBInput.value = "";

    universalInput.value = "";

    operationSelect.value = "union";


    showResult(

        "Calculation Result",

        "Enter your sets and calculate.",

        "Enter values into Set A and Set B, choose an operation, and click Calculate Result.",

        "A ∪ B = {x | x ∈ A or x ∈ B}",

        "A ∪ B"

    );


    statA.textContent = "0";

    statB.textContent = "0";

    statIntersection.textContent = "0";

    statUnion.textContent = "0";


    vennAOnly.textContent = "∅";

    vennIntersection.textContent = "∅";

    vennBOnly.textContent = "∅";

}


/* =========================
   BUTTON EVENTS
========================= */

calculateBtn.addEventListener(
    "click",
    calculate
);


clearBtn.addEventListener(
    "click",
    clearCalculator
);


/* =========================
   ENTER KEY
========================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.ctrlKey &&
            event.key === "Enter"
        ) {

            calculate();

        }

    }
);


/* =========================
   INPUT CHANGE
========================= */

[
    setAInput,
    setBInput,
    universalInput
].forEach(input => {

    input.addEventListener(
        "input",
        function() {

            const A =
                parseSet(setAInput.value);

            const B =
                parseSet(setBInput.value);

            updateStatistics(A, B);

            updateVenn(A, B);

        }
    );

});


/* =========================
   INITIAL CALCULATION
========================= */

calculate();