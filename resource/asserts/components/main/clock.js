import React, { Component } from 'react';
import style from './clock.css'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class Clock extends Component{
    constructor () {
        super()
        this.state = {
            buttonType: 1,  //start is 1, stop is 0.
            tomatoTime: 1500, //25 minutes, 1500 secon
            open: false
        }
    }

    handleStartClick () {
        this.tick.call(this); //execute immediately
        this.countDown = setInterval(this.tick.bind(this), 1000);
    }

    handleStopClick () {
        this.setState({open: true});
    }

    handleCloseAlert () {
        clearInterval(this.countDown);
        this.setState({
            open: false,
            buttonType: 1,
            tomatoTime: 1500
        });
    };

    
    tick () {
        let time = this.state.tomatoTime;
        
        if( time > 0 ) {
            time -= 1;
        }
         this.setState({
            buttonType: 0,
            tomatoTime: time
        })
    }

    getTime () {
        let ul = [];
        let state = this.state;
        if( state.buttonType ) {
            return (
                <ul>
                    <li>25</li>
                    <li>:</li>
                    <li>00</li>
                </ul>
            )
        }
        let time = this.state.tomatoTime;
        let second = time % 60;
        if( second < 10 ) {
            second += "0";
        }
        let minute = Math.floor(time / 60);
        return (
                <ul>
                    <li>{minute}</li>
                    <li>:</li>
                    <li>{second}</li>
                </ul>
        );
    }


    render () {
        let button =  [];
        let time = this.getTime();
        if( this.state.buttonType ) {
            button.push(
                <IconButton iconClassName="icon-font icon-kaishi" 
                onClick={this.handleStartClick.bind(this)}
                iconStyle={{width: 48, height: 48, fontSize: 46}} 
                style={{display: 'block', margin: '0 auto', width: 96, height: 96, padding: 24}}
                />
            )
        }else {
            button.push(
                <IconButton iconClassName="icon-font icon-zanting" 
                onClick={this.handleStopClick.bind(this)}
                iconStyle={{width: 48, height: 48, fontSize: 46}} 
                style={{display: 'block', margin: '0 auto', width: 96, height: 96, padding: 24}}
                />
            )
        }

        let actions = [
            <FlatButton
                label="取消"
                primary={true}
                onClick={this.handleCloseAlert.bind(this)}
            />,
            <FlatButton
                label="确认"
                primary={true}
                onClick={this.handleCloseAlert.bind(this)}
            />
        ]

        return (
            <div>
                <div className={style['clock']}>
                    <div className={style.wrap}>
                        {time}
                    </div>
                </div>
                {button}
                <Dialog
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleCloseAlert.bind(this)}
                >
                停止倒计时将不会保留本次计时，是否停止倒计时？
                </Dialog>
            </div>
        )
    }

} 