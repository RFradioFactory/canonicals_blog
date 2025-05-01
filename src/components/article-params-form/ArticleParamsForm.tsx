import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Select } from '../select';
import { SelectProps } from '../select/Select';
import { backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions, OptionType } from 'src/constants/articleProps';
import { RadioGroup, RadioGroupProps } from '../radio-group/RadioGroup';
import { ArticleParamsFormProps } from 'src/index';
import { Spacing } from '../spacing';
import { Text } from 'components/text';
import { Separator } from '../separator';

export type OpenClose = {
	isOpen: Boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<Boolean>>;
}


export const ArticleParamsForm = ({ onSettingsChange }: ArticleParamsFormProps) => {

	const [isOpen, setIsOpen] = useState<Boolean>(false);
	console.log('init isOpen', isOpen);
	const asideRef = useRef<HTMLDivElement>(null);
	function onClose(): void {
		isOpen? setIsOpen((prev) => !prev): '';
	}
	

	//ШРИФТЫ 
	const optionsFonts = fontFamilyOptions;
	const [selectedFont, setSelected] = useState<OptionType>(defaultArticleState.fontFamilyOption);

	const fontsProps: SelectProps = {
		selected: selectedFont,
		options: optionsFonts,
		onChange: (selected: OptionType) => {
			setSelected(selected);
		},
		title: 'Шрифты'
	}


	//РАЗМЕР 
	const optionsPixel = fontSizeOptions;
	const [selectedPixel, setSelectedPixel] = useState<OptionType>(defaultArticleState.fontSizeOption);

	const pixelProps: RadioGroupProps = {
		name: 'radio',
		options: optionsPixel,
		selected: selectedPixel,
		onChange: (value: OptionType) => {
			setSelectedPixel(value);
		},
		title: 'Размер'
	};


	//ЦВЕТ ШРИФТА
	const optionsColorFonts = fontColors;
	const [selectedColorFont, setSelectedColorFont] = useState<OptionType>(defaultArticleState.fontColor);

	const colorFontProps: SelectProps = {
		selected: selectedColorFont,
		options: optionsColorFonts,
		onChange: (selected:OptionType) => {
			setSelectedColorFont(selected);
		},
		title: 'Цвет шрифта'
	};


	//ЦВЕТ ФОНА
	const optionsBGColor = backgroundColors;
	const [selectedBGColor, setSelectedBGColor] = useState<OptionType>(defaultArticleState.backgroundColor);

	const bgcolorProps: SelectProps = {
		selected: selectedBGColor,
		options: optionsBGColor,
		onChange: (selected:OptionType) => {
			setSelectedBGColor(selected);
		},
		title: 'Цвет фона'
	};

	

	//ШИРИНА КОНТЕНТА
	const optionsWidthArr = contentWidthArr;
	const [selectedWidthArr, setSelectedWidthArr] = useState<OptionType>(defaultArticleState.contentWidth);

	const widthArrProps: SelectProps = {
		selected: selectedWidthArr,
		options: optionsWidthArr,
		onChange: (selected:OptionType) => {
			setSelectedWidthArr(selected);
		},
		title: 'Ширина контента'
	};


	

	/** Клик вне сайд бара */
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
		  if (asideRef.current && !asideRef.current.contains(event.target as Node)) {
			onClose();
		  }
		};
	
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
		  document.removeEventListener('mousedown', handleClickOutside);
		};
	  }, [onClose]);
	
	/**Клик кнопки Применить */
	  const handleClickSubmit = () => {
		onSettingsChange({ fontFamilyOption: selectedFont });
		onSettingsChange({ fontSizeOption: selectedPixel});
		onSettingsChange({ fontColor: selectedColorFont});
		onSettingsChange({ contentWidth: selectedWidthArr});
		onSettingsChange({ backgroundColor: selectedBGColor});
	}
	/**Клик кнопки Сбросить */
	function handleClickReset(): void {
		onSettingsChange({ fontFamilyOption: defaultArticleState.fontFamilyOption });
		onSettingsChange({ fontSizeOption: defaultArticleState.fontSizeOption});
		onSettingsChange({ fontColor: defaultArticleState.fontColor});
		onSettingsChange({ contentWidth: defaultArticleState.contentWidth});
		onSettingsChange({ backgroundColor: defaultArticleState.backgroundColor});
		setSelected(defaultArticleState.fontFamilyOption);
		setSelectedPixel(defaultArticleState.fontSizeOption);
		setSelectedColorFont(defaultArticleState.fontColor);
		setSelectedWidthArr(defaultArticleState.contentWidth);
		setSelectedBGColor(defaultArticleState.backgroundColor);
		
	}
	

	return (
		<>
			<ArrowButton isOpen = {isOpen} setIsOpen = {setIsOpen} />

			<aside
				ref = {asideRef}
				className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
				>
				<form className={styles.form}>
					<Text size={31} weight={800} uppercase>Задайте параметры</Text>
					<Spacing size = {50} />
					<Select {...fontsProps}/>
					<Spacing size = {50} />
					<RadioGroup {...pixelProps}/>
					<Spacing size = {50} />
					<Select {...colorFontProps}/>
					<Spacing size = {50} />
					<Separator />
					<Spacing size = {50} />
					<Select {...bgcolorProps}/>
					<Spacing size = {50} />
					<Select {...widthArrProps}/>
					<Spacing size = {50} />
					<div className={styles.bottomContainer}>

						
						<Button
							title='Сбросить'
							type='reset'
							onClick={handleClickReset}
						/>
						<Button title='Применить' type='button' onClick={handleClickSubmit}/>
					</div>
				</form>
			</aside>
		</>
	);
};
