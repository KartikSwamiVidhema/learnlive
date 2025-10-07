import React from "react";

const Card = ({
    imageSrc,
    productName,
    rating,
    featuresLink,
    price,
    priceSuffix = "/Month",
    onDemoClick,
    onPriceClick
}) => {
    return (
        <div style={styles.card}>
            <img src={imageSrc} alt={productName} style={styles.image} />
            <p style={styles.productName}>{productName}</p>

            <div style={styles.features}>
                <span style={{ color: "green" }}>★{rating}</span>
                <a href={featuresLink} style={styles.featuresLink}>Features</a>
            </div>

            <button style={styles.demoButton} onClick={onDemoClick}>
                GET FREE DEMO
            </button>

            <hr style={styles.separator} />

            <div style={styles.priceSection}>
                <span style={styles.price}>$20</span>
                <span style={styles.priceSuffix}>{priceSuffix}</span>
                <button style={styles.priceButton} onClick={onPriceClick}>
                    GET PRICE
                </button>
            </div>
        </div>
    );
};

const styles = {
    card: {
        width: "250px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "16px",
        margin: "8px",
        boxShadow: "0 0 5px rgba(0,0,0,0.1)",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
    },
    image: {
        width: "80px",
        height: "80px",
        objectFit: "contain",
        marginBottom: "12px"
    },
    productName: {
        fontWeight: "600",
        marginBottom: "16px"
    },
    features: {
        marginBottom: "12px",
    },
    featuresLink: {
        marginLeft: "4px",
        color: "#0d6efd",
        cursor: "pointer",
        textDecoration: "none",
        fontWeight: "600"
    },
    demoButton: {
        width: "100%",
        padding: "10px",
        borderRadius: "4px",
        border: "1px solid #0d6efd",
        backgroundColor: "transparent",
        color: "#0d6efd",
        fontWeight: "600",
        cursor: "pointer",
        marginBottom: "12px"
    },
    separator: {
        borderColor: "#ddd"
    },
    priceSection: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    price: {
        fontWeight: "600",
        fontSize: "16px"
    },
    priceSuffix: {
        color: "#666",
        marginLeft: "4px",
        fontSize: "12px",
        flexGrow: 1
    },
    priceButton: {
        backgroundColor: "#0d6efd",
        border: "none",
        padding: "8px 16px",
        color: "white",
        borderRadius: "6px",
        fontWeight: "600",
        cursor: "pointer"
    },
};

export default Card;