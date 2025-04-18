import React, { useState, useEffect } from "react";


const MinigameRulesModal = ({ gameName, onRulesClosed }) => {
    const [rules, setRules] = useState([]);
    const [gameDisplayName, setGameDisplayName] = useState("");
    const [showModal, setShowModal] = useState(true);

    const handleCloseModal = () => {
        setShowModal(false);
        if (onRulesClosed) {
            onRulesClosed();
        }
    }

    useEffect(() => {
        import("../../../../public/minigames.json").then((module) => {
            const games = module.default;
            const game = games.find((minigame) => minigame.name === gameName);
            if (game) {
                setRules(game.rules);
                setGameDisplayName(game.display_name);
            }
        })
            .catch((error) => console.error("Error loading minigame data", error));
    }, [gameName]);

    return (
        <div>
            {/* Modal */}
            {showModal && (
                <div
                    className="modal fade show"
                    style={{ display: "block" }}
                    tabIndex="-1"
                    role="dialog"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-dark">Reglas de {gameDisplayName}</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={handleCloseModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                {rules.length > 0 ? (
                                    <ol>
                                        {rules.map((rule, index) => (
                                            <li className="text-dark" key={index}>{rule}</li>
                                        ))}
                                    </ol>
                                ) : (
                                    <p>Loading rules...</p>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleCloseModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MinigameRulesModal;