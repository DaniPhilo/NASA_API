import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Image from './Image'
import Map from './landings/Map';
import LandingsList from './landings/LandingsList';
import NeasList from './neas/NeasList';

function Main() {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Image />} />
                <Route path="/landings" element={<Map />} />
                <Route path="/landings/list" element={<LandingsList />} />
                <Route path="/neas" element={<NeasList />} />
            </Routes>
        </main>
    )
}

export default Main