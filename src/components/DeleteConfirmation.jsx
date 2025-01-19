import React from 'react'
import { Modal } from '@mui/material'

const DeleteConfirmation = ({ children, onCancel, onConfirm, open, style}) => {
    return (
        <Modal
            open={open}
            onClose={onCancel}
        >

            <div className="modalContainer" style={style}>
                <form onSubmit={(e) => { e.preventDefault(); onConfirm(); }}>
                    <div className="contentWrapper">
                        {children}
                    </div>
                    <div className="buttonWrapper">
                        <button type="submit">Delete</button>
                        <button onClick={onCancel}>Cancel</button>
                    </div>

                </form>
            </div>

        </Modal>
    )
}

export default DeleteConfirmation
