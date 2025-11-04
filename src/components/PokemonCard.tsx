import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { PokemonEntity } from '../model/entities/PokemonEntity';

type Props = {
    item: PokemonEntity;
    onPress: () => void;
};

const PokemonCard: React.FC<Props> = ({ item, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            accessibilityLabel={`Card do Pokémon ${item.name}`}
            accessibilityHint={`Abre detalhes de ${item.name}`}>
            <Image source={item.image ? { uri: item.image } : undefined} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginVertical: 6,
        marginHorizontal: 12,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
    },
    image: {
        width: 72,
        height: 72,
        resizeMode: 'contain',
        marginRight: 12,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
});


export default PokemonCard;