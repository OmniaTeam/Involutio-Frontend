import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ModalProps {
	onClose: () => void;
	children: ReactNode;
}

export default function Modal(props: ModalProps) {
	return <div className={'modal--overlay'} onClick={props.onClose}>
		<motion.div className={'modal--content'}
		            onClick={(e) => e.stopPropagation()}
		            initial={{ opacity: 0, y: 50 }}
		            animate={{ opacity: 1, y: 0 }}
		            transition={{ duration: 0.5 }}
		>
			{ props.children }
		</motion.div>
	</div>
}