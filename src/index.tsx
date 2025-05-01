import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, createContext } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, OptionType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
export interface ArticleState {
	fontFamilyOption: OptionType;
	fontSizeOption: OptionType;
	fontColor: OptionType;
	contentWidth: OptionType;
	backgroundColor: OptionType;
  }

export interface ArticleParamsFormProps {
onSettingsChange: (newSettings: Partial<ArticleState>) => void;
}

const App = () => {
	const [settings, setSettings] = useState<ArticleState>(defaultArticleState);

	const handleSettingsChange = (newSettings: Partial<ArticleState>) => {
		setSettings(prev => ({ ...prev, ...newSettings }));
	};
	
	return (
		
		<div
			className={clsx(styles.main)}
			style={
				{
				'--font-family': settings.fontFamilyOption.value,
				'--font-size': settings.fontSizeOption.value,
				'--font-color': settings.fontColor.value,
				'--container-width': settings.contentWidth.value,
				'--bg-color': settings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onSettingsChange={handleSettingsChange} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
