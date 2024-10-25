import React from 'react'
import { Link } from 'react-router-dom'

const SmallCard = () => {
    return (
        <div className="bg-white p-4 mb-4">
            <ul className="p-0" style={{ fontSize: "13px" }}>
                <li className="mb-2">

                    <i className="fa-solid fa-signal me-2"></i> Status : &nbsp;<b>Draft</b> <Link>Edit</Link>
                </li>
                <li className="mb-2">

                    <i className="fa-solid fa-eye me-2"></i> Visibility : &nbsp;<b>Public</b> <Link>Edit</Link>
                </li>
                <li className="mb-2">

                    <i className="fa-solid fa-calendar me-2"></i> Publish &nbsp;<b>Immediately</b> <Link>Edit</Link>
                </li>
            </ul>
        </div>
    )
}

export default SmallCard