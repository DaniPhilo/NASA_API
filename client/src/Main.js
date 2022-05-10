import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Image from './Image'
import Map from './Map';
import List from './List';

function Main() {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Image />} />
                <Route path="/landing" element={<Map />} />
                <Route path="/landing/list" element={<List />} />
            </Routes>
        </main>
    )
}

export default Main