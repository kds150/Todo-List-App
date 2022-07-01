import React from 'react';
import classes from './Task.module.css';

function Task (props) {

    return (
            <div className={classes.task}>
                {props.done ?
                    <div className={classes.content} onClick={props.doneClicked} style={{fontSize: '13px'}}>
                         <svg style={{color: 'hsl(192, 98%, 51%)'}} xmlns="http://www.w3.org/2000/svg" width="23" height="24" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                        </svg>
                        <strike>
                            {props.content}
                        </strike>

                    </div>    

                :    
                    <div className={classes.content} onClick={props.doneClicked}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        </svg>
                        {props.content}
                    </div>
                }
                
                   
                
                <svg onClick={props.removeClicked} xmlns="http://www.w3.org/2000/svg" width="24" height="20" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                </svg>
            </div>

    );
}

export default Task;