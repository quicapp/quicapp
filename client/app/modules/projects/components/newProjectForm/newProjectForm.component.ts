import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { MdSnackBar } from '@angular/material';
import { ProjectsService } from '../../services/projects.service';
import { Router } from '@angular/router';
import { iProject } from './../../models/project.interface';

interface iFramework {
    id: number,
    name: string
}

interface iUilibrary {
    id: number,
    name: string
}


@Component({
    selector: 'new-project-form',
    styleUrls: ['newProjectForm.component.scss'],
    templateUrl: 'newProjectForm.component.html',
    animations: [
        trigger('animateCircle', [
            state('false', style({
                opacity: 0
            })),
            state('true', style({
                opacity: 1
            })),
            transition('false <=> true', animate('250ms ease-in'))
        ])
    ]
})

export class NewProjectForm implements OnInit {
    isVisible: boolean = false;
    submiting: boolean = false;
    newForm: FormGroup;
    frameworks: iFramework[] = [{ id: 1, name: 'Angular' }];
    uilibrarys: iUilibrary[] = [{ id: 1, name: 'Material Design' }];

    constructor(
        private projectSrv: ProjectsService,
        private snackbar: MdSnackBar,
        private router: Router
    ) {

    }

    ngOnInit() {
        this.newForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            framework: new FormControl('', [Validators.required]),
            library: new FormControl('', [Validators.required])
        });
    }

    showNotify(message: string, action: string): void {
        this.snackbar.open(message, action, {
            duration: 3000
        });
    }


    toogleModalState() {
        this.isVisible = !this.isVisible;
    }

    onSubmit() {
        let val = this.newForm.value;
        val.creationTime = new Date();
        this.submiting = true;
        this.projectSrv.addProject(this.newForm.value).subscribe(
            (project: iProject) => {
                this.toogleModalState();
                this.submiting = false;
                this.router.navigate(['/projects', project._id]);
            },
            (error) => {
                this.submiting = false;
                this.toogleModalState();
                this.showNotify(error, 'NEWPROJECT');
            }
        );
    }


    onReset() {
        this.newForm.reset();
        this.isVisible = !this.isVisible;
    }

}