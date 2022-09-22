import fetch from 'node-fetch';
import moment, * as moments from 'moment';
import UserModal from "../models/user.js";
const COINAPI = process.env.COINAPI || null;
const headers = { 'X-CoinAPI-Key': COINAPI }

export const coinDetails = async (req, res) => {
    try {
        let response = await fetch('https://rest.coinapi.io/v1/exchangerate/BTC/USD', { method: 'GET', headers: headers })
        const data = await response.json();
        res.status(200).json({ data });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const lastGuess = async (req, res) => {
    try {
        const user = await UserModal.findById(req.userId);
        const currentDate = moment(new Date());
        const guessDate = moment(user.lastGuess.date);
        const difference = currentDate.diff(guessDate, 'minutes')
        if (user.lastGuess.status === 'INPROGRESS', difference >= 1) {
            let url = `https://rest.coinapi.io/v1/exchangerate/BTC/USD/history?period_id=1MIN&time_start=${guessDate}&time_end=${guessDate.add(1, 'minutes')}`;
            console.log(url)
            let response = await fetch('https://rest.coinapi.io/v1/exchangerate/BTC/USD', { method: 'GET', headers: headers });
            const data = await response.json();
            user.lastGuess.status = 'RESOLVED';
            if (data.rate > user.lastGuess.price && user.lastGuess.goup) {
                user.success = user.success + 1
            } else {
                user.failed = user.failed + 1
            }
        }
        res.status(200).json({ user});
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const createGuess = async (req, res) => {
    try {
        const guess = req.body;
        guess.date = new Date
        const user = await UserModal.findOneAndUpdate({ _id: req.userId }, { lastGuess: guess }, { new: true });
        res.status(200).json({ user: user });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong" });
    }
};