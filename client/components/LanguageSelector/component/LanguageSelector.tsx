import React from 'react';

import '../styles/LanguageSelector.scss';
import {ILanguageMeta} from "../../../../@types";
import Flag from "../../Flag/Flag";

interface ILanguageSelector {
    supportedLanguages: ILanguageMeta[]
    onToggleLanguage(localCode: string): () => void;
}

export default function LanguageSelector({ supportedLanguages, onToggleLanguage }: ILanguageSelector) {

    return (
        <div className="LanguageSelector">
            {
                supportedLanguages.map((lang: ILanguageMeta) => (
                    <div key={`lang-${lang.countryCode}`} onClick={onToggleLanguage(lang.localeCode)}>
                        <Flag
                            countryCode={lang.countryCode}
                        />
                    </div>
                ))
            }
        </div>
    )
}