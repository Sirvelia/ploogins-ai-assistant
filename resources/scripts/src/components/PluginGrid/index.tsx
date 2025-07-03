import React from "react";
import Plugin from "@/components/Plugin";
import PluginType from "@/types/Plugin";
import './style.css';

interface PluginGridProps {
    results: PluginType[];
}

const PluginGrid = ({ results }: PluginGridProps) => {
    if (results && results.length > 0) {
        return (
            <div className="ploogin-cards-grid">
                {results.map((plugin) => (
                    <Plugin
                        key={plugin.slug}
                        plugin={plugin}
                    />
                ))}
            </div>
        );
    }
};

export default PluginGrid;