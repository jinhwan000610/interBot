// components/CustomText.tsx

import React from 'react';
import { Text, TextProps } from 'react-native';

const CustomText: React.FC<TextProps> = ({ children, style, ...props }) => {
	return (
		<Text style={[{ fontFamily: 'Pretendard' }, style]} {...props}>
			{children}
		</Text>
	);
};

export default CustomText;