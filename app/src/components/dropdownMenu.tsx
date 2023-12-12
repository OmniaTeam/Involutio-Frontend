import { useState } from "react";

interface DropdownMenuProps {
	options?: { value: string; label: string }[];
	onSelectOption: (selectedValue: string) => void;
	defaultSelected: string
}

export default function DropdownMenu(props : DropdownMenuProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState(props.defaultSelected);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const handleOptionClick = (option: { value: string; label: string }) => {
		setSelectedOption(option.value);
		props.onSelectOption(option.value);
		setIsOpen(false);
	};
	return <div className={'dropdown'}>
		<div className={'dropdown--heading'} onClick={toggleMenu}>
			{selectedOption || 'выберите грейд'}
			{isOpen ? <div className={'dropdown--heading__up'}/> : <div className={'dropdown--heading__down'}/>}
		</div>
		{isOpen && (
			<ul className={'dropdown--list'}>
				{props.options?.map((option) => (
					<li className={'dropdown--list__item'} key={option.value} onClick={() => handleOptionClick(option)}>
						{option.label}
					</li>
				))}
			</ul>
		)}
	</div>
}