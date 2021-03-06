/** @format */

import React from "react";
import { Text, View, Pressable, FlatList } from "react-native";
import { connect } from "react-redux";

import AddExpenditureModal from "./AddExpenditureModal";

import {
	addExpenditure,
	removeExpenditure,
	resetExpenditures,
} from "../../redux/actions";

import styles from "./screen.styles";

const ExpenditureListItem = (props) => {
	return (
		<View style={styles.item}>
			<Text style={styles.itemText}>{props.item.id}</Text>
			<Text style={styles.itemText}>Title: {props.item.title}</Text>
			<Text style={styles.itemText}>Spent: {props.item.spent}</Text>
			<Pressable
				style={styles.itemRemove}
				onPress={() => props.onRemove(props.item.id)}>
				<Text style={styles.itemRemoveText}>remove</Text>
			</Pressable>
		</View>
	);
};

const ExpenditureListEmpty = () => {
	return (
		<View style={styles.container}>
			<Text style={[styles.text, styles.emptyListText]}>
				Did you just hit the reset button? :|
			</Text>
		</View>
	);
};

class ExpenditureScreen extends React.Component {
	state = {
		showModal: false,
	};

	_addExpenditure = (expenditure) => {
		this.props.addExpenditure(expenditure);
	};

	_removeExpenditure = (expenditureId) => {
		this.props.removeExpenditure(expenditureId);
	};

	_resetExpenditures = () => {
		this.props.resetExpenditures();
	};

	_openModal = () => {
		this.setState({ ...this.state, showModal: true });
	};

	_closeModal = () => {
		this.setState({ ...this.state, showModal: false });
	};

	render() {
		return (
			<View style={styles.container}>
				<Text style={[styles.headingText, styles.text]}>
					Total spent: {this.props.expenditures.totalSpent}
				</Text>
				<View style={styles.buttonContainer}>
					<Pressable
						style={styles.pressable}
						onPress={() => {
							this._openModal();
						}}>
						<Text style={styles.pressableText}>Add Expenditure</Text>
					</Pressable>
					<Pressable
						style={styles.pressable}
						onPress={() => {
							this._resetExpenditures();
						}}>
						<Text style={styles.pressableText}>Reset Expenditures</Text>
					</Pressable>
				</View>
				<FlatList
					contentContainerStyle={{ flexGrow: 1 }}
					data={this.props.expenditures.expenditureList}
					renderItem={(item) => {
						return (
							<ExpenditureListItem
								item={item.item}
								onRemove={this._removeExpenditure}
							/>
						);
					}}
					keyExtractor={(item) => item.id}
					ListEmptyComponent={ExpenditureListEmpty}></FlatList>
				{this.state.showModal && (
					<AddExpenditureModal
						addExpenditure={this._addExpenditure}
						closeModal={this._closeModal}
					/>
				)}
			</View>
		);
	}
}

const mapStateToProps = (state) => ({
	expenditures: state.expenditures,
	token: state.token,
});

export default connect(mapStateToProps, {
	addExpenditure,
	removeExpenditure,
	resetExpenditures,
})(ExpenditureScreen);
